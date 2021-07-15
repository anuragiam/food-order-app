import React from 'react'
import classes from './Input.module.css'

const Input=(props)=> {
  return (
    <div className={classes.input}>
      <lable htmlFor={props.input.id} >{props.lable}</lable>
      <input {...props.input} />
    </div>
  )
}

export default Input
