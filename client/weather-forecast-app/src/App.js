import React from 'react';
import { Component } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'

import SearchDataContext from './context/SearchDataContext'

import CityTable from './components/CityTable';
import WeatherShowBySearch from './components/WeatherShowBySearch'
import WeatherShow from './components/WeatherShow';

class App extends Component{
  state={searchData:''}

  setSearchData=(value)=>{
    this.setState({searchData:value})
  }

  render(){
    const {searchData}=this.state
    
    return <SearchDataContext.Provider value={
      {
        searchData,
        setSearchData:this.setSearchData
      }
    }>
      
      <div className="App">
          <Routes>
            <Route path='/' element={<CityTable />}/>
            <Route path='/weather-path' element={<WeatherShowBySearch/>}/>
            <Route path='/weather-path/:id' element={<WeatherShow/>}/>
          </Routes>
      </div>
    
    </SearchDataContext.Provider>
  }
}

export default App;
