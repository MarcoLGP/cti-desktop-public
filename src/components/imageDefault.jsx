import React from 'react'

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name, mTop='1%', height=200, width=200) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        marginTop: mTop,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: height,
        width: width
      },
      children: <span style={{ fontSize: '3.8em' }}>{name.split(' ')[0][0]}{name.split(' ')[1][0]}</span>,
    };
  }

export {stringAvatar}