import React from 'react'
import style from './style.module.scss'
import { LocationIcon, SearchIcon } from '../../assets/icon'
const Search = ({ type }) => {
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
      <input type="text" placeholder={placeholder} />
      <div className={style.search__icon}>
        {icon === 'search' ? <SearchIcon /> : <LocationIcon />}
      </div>
    </div>
  )
}

export default Search
