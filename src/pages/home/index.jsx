import React from 'react'
import style from './style.module.scss'
import Search from '../../components/Search'
import Button from '../../components/Button'

const Home = () => {
  return (
    <div>
      <div style={{ height: '50px' }}></div>
      <div className={style.search}>
        <Search type={'search'} />
        <Search type={'location'} />
        <Button title={'Find jobs'} />
      </div>
    </div>
  )
}

export default Home
