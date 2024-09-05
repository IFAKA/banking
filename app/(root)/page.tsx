import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Guest'}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn.firstName || 'Guest'}
            subtext='Access and manage your account and tx.'
          />
        </header>
      </div>
    </section>
  )
}

export default Home