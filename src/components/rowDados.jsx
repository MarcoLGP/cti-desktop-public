import React from 'react'
import Icon from '@mdi/react'

export default function RowDados(props) {

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '3%',
            alignItems: 'center'
        },
        fontStyle: {
            marginLeft: 8,
            fontWeight: 'bolder',
            marginTop: props.marginTop ? 5 : 'null',
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        lastIcon: {
            marginLeft: 'auto',
            cursor: 'pointer',
            marginRight: 5
        }
    }

    return (
        <div style={styles.container}>
            <Icon size={1.2} path={props.path} style={{ color: props.color ? props.color : null }} />
            <p style={styles.fontStyle}>{props.info ? props.info : 'Não informado'}</p>
            {props.last ?
                <p style={styles.lastIcon} onClick={props.onIconClick}>
                    <Icon size={1.2} path={props.path2} />
                </p>
                : null}
        </div>
    )
}