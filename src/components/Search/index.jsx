import React from 'react'
import style from './style.module.scss'
import { LocationIcon, SearchIcon } from '../../assets/icon'
const Search = ({ type }) => {
  console.log(type)
  let title = 'What'
  let placeholder = 'job title, keywords or company'
  let icon = 'search'
  if (type === 'location') {
    title = 'Where'
    placeholder = 'City or province'
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
