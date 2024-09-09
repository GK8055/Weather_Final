import './index.css'
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {v4} from 'uuid'
import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import SearchDataContext from '../../context/SearchDataContext';
import { useNavigate } from 'react-router-dom';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [city,setCity]=useState('')
  const [citySearch,setCitySearch]=useState('')
  const navigate=useNavigate()
  
  // Fetch cities data
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20`); // Mock API endpoint
      const newCities = await response.json();
      const {results} =newCities
      console.log('cities', results)

      // If there's no more data, stop further fetches
      if (results.length === 0) {
        setHasMore(false);
      }

      // Append new cities to the current list
      setCities((prevCities) => [...prevCities, ...results]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Use effect to fetch initial data
  useEffect(() => {
    fetchCities();
  }, [page]);

  
  return (
    <SearchDataContext.Consumer>
        {value=>{
            const {setSearchData}=value
            const onClikcSearchData=()=>{
                setSearchData(citySearch)
                navigate('/weather-path')

              }

              // Load more data when scrolled to the bottom
            const fetchMoreCities = () => {
                setPage((prevPage) => prevPage + 1);
            };

            const onGetCityName=async (e)=>{
                setCity(e.target.value)
            }

            const onGetCitySearch=(e)=>{
                setCitySearch(e.target.value)
            }
        const renderCitiesView=()=>{
        const isSearched=city !==""?(cities.filter(each=>(
                    each.name.toLowerCase().includes(city.toLowerCase())
                ))):cities
            console.log('isSearched', isSearched)
            return (
                isSearched.map((city) => (
                    <tr key={v4()}>
                    <td>{city.cou_name_en}</td>
                    <td>
              <Link to={`/weather-path/${v4()}`} style={{ textDecoration: 'none', backgroundColor: 'black',color:'white' }}>
                   {city.name}
              </Link>
              </td>
              <td>{city.timezone}</td>
              <td>{city.modification_date}</td>
            </tr>
            ))
            )
        }


            return (
                <div className='cities_container'>
            <div className='search_container'>
            <input type='search' className='input_ele' placeholder='Search With City Name' value={citySearch} onChange={onGetCitySearch}/>
            <FaSearch onClick={onClikcSearchData} size={33} className='icon_size'/>
            </div>
            <h1 className='cities_heading'>Cities Table with Infinite Scroll</h1>
            <input type='search' className='input_ele_table' placeholder='Search' value={city} onChange={onGetCityName}/>
            <InfiniteScroll
                dataLength={cities.length}
                next={fetchMoreCities}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>You have seen all cities.</p>}
            >
                <table  border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                    <th>Country Name</th>
                    <th>City Name</th>
                    <th>Time Zone</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCitiesView()}            
                </tbody>
                </table>
            </InfiniteScroll>
            </div>
             )
        }}
    </SearchDataContext.Consumer>
  );
};

export default CitiesTable;
