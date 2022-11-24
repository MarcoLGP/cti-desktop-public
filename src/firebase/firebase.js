import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore"
import { updateProfile, onAuthStateChanged, sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { compare, genSalt, hash } from 'bcryptjs'
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { setPhotoPreview } from '../redux/login'

const firebaseConfig = {
  apiKey: "AIzaSyDOOvsrPT7LgfkzhM0-56NATwR8C-_wI_A",
  authDomain: "cti-informatica-e68c8.firebaseapp.com",
  projectId: "cti-informatica-e68c8",
  storageBucket: "cti-informatica-e68c8.appspot.com",
  messagingSenderId: "210043928453",
  appId: "1:210043928453:web:3f3857ab4e28220aa70eec",
  measurementId: "G-DZJCYKL8E5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

const storage = getStorage();

const auth = getAuth();

const RegistrarUser = (colaborador, email, password, setErro, setHelper, setOpen) => {

  const originalUser = auth.currentUser

  createUserWithEmailAndPassword(auth, email, password)
    .then(e => {
      setErro(false)
      setHelper('')
      atualizarUserNome(colaborador)
      updateUser(originalUser)
      setOpen(false)
    })
    .catch((error) => {
      setErro(true)
      setHelper('Desculpe, houve um erro no servidor')
    });
}

const colaborador = () => {
  return {
    nome: auth.currentUser.displayName
  }
}

const passEdit = (email, setError) => {
  sendPasswordResetEmail(auth, email).then().catch(err => setError(true))
}

const deleteDocument = async (coll, id) => await deleteDoc(doc(db, coll, id))

const updateUnidades = async (id, prev) => {
  const passRef = doc(db, "Estoque", id);
  await updateDoc(passRef, {
    Unidades: prev
  });
}

const updateUser = async (user) => {
  await auth.updateCurrentUser(user)
}

const LoginUser = (email, password, setErro, setHelper, login, setOpen, navigate, setSenha) => {

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setErro(false)
      setHelper('')
      if (login) {
        window.electron.singleSend('auth')
        navigate('/Dashboard')
        setSenha('')
      } else setOpen(false)
    })
    .catch((error) => {
      login ? setHelper('Credenciais inválidas') : setHelper('Senha inválida')
      setErro(true)
    });

}

const logout = () => {
  auth.signOut()
  window.electron.singleSend('logout')
}

const atualizarEmail = (email) => {
  updateEmail(auth.currentUser, email).then(() => {
    console.log('sucesso')
  }).catch((error) => {
    console.log(`Erro ${error}`)
  });
}

const atualizarFoto = (foto, setOpen, dispatch, local) => {

  const colaborador = auth.currentUser.displayName

  if (local) {
    const storageRef = ref(storage, `Colaboradores_Imagens/${colaborador}`);
    uploadString(storageRef, foto, 'data_url').then((snapshot) => {
      getDownloadURL(ref(storage, `Colaboradores_Imagens/${colaborador}`)).then((url) => {
        updateProfile(auth.currentUser, {
          photoURL: url
        }).then(() => {
          setOpen(false)
          dispatch(setPhotoPreview(url))
        })
      })
    });
  } else {
    updateProfile(auth.currentUser, {
      photoURL: foto ? foto : ''
    }).then(() => {
      setOpen(false)
      dispatch(setPhotoPreview(foto))
    }).catch((error) => {
      console.log(error)
    });
  }
}

const consultaDb = async (coll, filtro, request, dispatch, setPesquisa) => {

  const collRef = collection(db, coll)
  const q = query(collRef, where(filtro, '>=', request), where(filtro, '<=', `${request}\uf8ff`))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(doc => dispatch(setPesquisa({ ...doc.data() })))

}

const consultaDbRegistro = async (filtro, request, dispatch, setPesquisa) => {

  const registrosRef = collection(db, 'Registros')
  let q
  if (filtro == 'Todas') q = query(registrosRef, where('Nome', '>=', request), where('Nome', '<=', `${request}\uf8ff`))
  else q = query(registrosRef, where('tipo', '==', filtro), where('Nome', '>=', request), where('Nome', '<=', `${request}\uf8ff`))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(doc => dispatch(setPesquisa({ ...doc.data() })))

}

const atualizarUserNome = (nome) => {
  updateProfile(auth.currentUser, {
    displayName: nome
  })
}

const linkImage = (nome, setUrl) => getDownloadURL(ref(storage, nome)).then(url => setUrl(url))

const getDBpass = async (collectionName, pass, setAuth, setErro, setOpen, setHelperText, newpass) => {
  const dbRef = collection(db, collectionName)
  const data = await getDocs(dbRef)
  const arraySenha = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  arraySenha.map(senha => {
    compare(pass, senha.password, function (err, res) {
      if (res) {
        if (setAuth) {
          setAuth(true)
          setOpen(false)
        } else {
          updateDbPass(newpass, senha.id)
          setOpen(false)
        }
      } else if (!res) {
        setErro(true)
        setHelperText('Senha incorreta')
      }
    });
  })
}

const updateDbPass = (pass, id) => {

  genSalt(10, function (err, salt) {
    hash(pass, salt, function (err, hash) {
      updateDocument(hash, id)
    });
  });
}

const setDbData = async (obj, setIdNota) => {
  const dbRef = collection(db, 'Registros')
  await addDoc(dbRef, obj).then(doc => setIdNota(doc.id))
}

const addDocument = async (obj, coll, setId) => {
  const vendaAtivaRef = collection(db, coll)
  await addDoc(vendaAtivaRef, obj).then(doc => setId ? setId(doc.id) : null)
}

const addFicha = async (obj, setIdFicha) => {
  const fichaRef = collection(db, 'Ficha')
  await addDoc(fichaRef, obj).then(doc => {
    if (obj.Email) window.electron.doubleSend('enviarEmail', {
      Nome: obj.Nome,
      Email: obj.Email,
      data: obj.Data,
      id: doc.id
    })
    setIdFicha(doc.id)
  })
}

const updateDocument = async (hash, id) => {
  const passRef = doc(db, "Password", id);
  await updateDoc(passRef, {
    password: hash
  });
}

export { db, updateUnidades, linkImage, addDocument, addFicha, deleteDocument, consultaDb, consultaDbRegistro, colaborador, setDbData, logout, LoginUser, RegistrarUser, atualizarEmail, getDBpass, passEdit, onAuthStateChanged, auth, atualizarUserNome, atualizarFoto }