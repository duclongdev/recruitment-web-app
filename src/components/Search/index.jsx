import React from 'react'
import style from './style.module.scss'
import { LocationIcon, SearchIcon } from '../../assets/icon'
const Search = ({ type, onChange, name, value }) => {
  let title = 'Việc'
  let placeholder = 'Tên việc làm, từ khóa hoặc công ty'
  let icon = 'search'
  if (type === 'location') {
    title = 'Nơi'
    placeholder = 'Công ty hoặc tỉnh thành'
    icon = 'location'
  }
  return (
    <div className={style.search}>
      <span style={{ marginRight: '10px' }}>{title}</span>
      <input type="text" placeholder={placeholder} onChange={onChange} name={name} value={value} />
      <div className={style.search__icon}>
        {icon === 'search' ? <SearchIcon /> : <LocationIcon />}
      </div>
    </div>
  )
}

export default Search
