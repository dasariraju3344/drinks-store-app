import React, { useEffect, useState } from 'react';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const FetchData = () => {

  const [drinksData, setDrinksData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState({
    status:false,
    msg:""
  })

  const fetchingData = async (apiURL) => {
    setLoading(true)
    setIsError({
      status:false,
      msg:""
    })
    try{
      const response = await fetch(apiURL)
      const {drinks} = await response.json()
      setDrinksData(drinks)
      setLoading(false)
      setIsError({
        status:false,
        msg:""
      })
      if (!drinks) {
        throw new Error("Searched data not found")
      }
    } catch (error) {
      setLoading(false)
      setIsError({
        status:true,
        msg: error.message || "Something went wrong, please enter proper search input"
      })
    }
  }

  useEffect(() => {
    const correctURL = `${URL}${searchTerm}`
    fetchingData(correctURL)
  }, [searchTerm])

  return (
    <center>
      <form>
        <input 
          type="text" 
          name="search" 
          id="search" 
          placeholder='Type here to search...'
          className='input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </form>
      <hr />
      {loading && !isError?.status && <h2>Loading data...</h2>}
      {isError?.status && <h2>{isError.msg}</h2>}
      {!loading && !isError?.status &&
      <div className='data'>
        {drinksData.map((eachItem) => {
          const {idDrink, strDrink, strDrinkThumb} = eachItem;
          return (
            <div key={idDrink}>
              <div>
                <img className='image' src={strDrinkThumb} alt={strDrink} />
              </div>
              <div>
                <h2>{strDrink}</h2>
              </div>
            </div>
        )})}
      </div>}
    </center>
  )
}

export default FetchData;