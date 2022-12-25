import React from 'react'
import style from './style.module.scss'
import { LocationIcon, SearchIcon } from '../../assets/icon'
import locationData from '../../assets/mockData/location.json'
import jobData from '../../assets/mockData/job.json'

const Search = ({ type, onChange, name, value, onClick }) => {
  let title = 'Việc'
  let placeholder = 'Tên việc làm, từ khóa hoặc công ty'
  let icon = 'search'
  let listSuggestion = jobData
  if (type === 'location') {
    title = 'Nơi'
    placeholder = 'Công ty hoặc tỉnh thành'
    icon = 'location'
    listSuggestion = locationData
  }
  return (
    <div className={style.search}>
      <span style={{ marginRight: '10px' }}>{title}</span>
      <input type="text" placeholder={placeholder} onChange={onChange} name={name} value={value} />
      <div className={style.search__icon}>
        {icon === 'search' ? <SearchIcon /> : <LocationIcon />}
      </div>

      <div className={style.suggestion}>
        {listSuggestion
          .filter((item) => {
            const suggestItem = value.toLowerCase()
            const locationItem = item.name.toLowerCase()
            return (
              suggestItem && locationItem.startsWith(suggestItem) && locationItem !== suggestItem
            )
          })
          .slice(0, 10)
          .map((item) => (
            <div
              className={style.suggestion__item}
              key={item.name}
              onClick={() => onClick(type, item.name)}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Search
