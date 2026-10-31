const PopularDestinations = () => {
  return (
    <section className='px-8 py-20 lg:px-28'> 
    
    <h1 className='text-2xl font-bold mb-2'>Popular Destinations</h1>
    <p className='text-lg font-medium mb-2'>Where Green<span className="text-green-500">Spring</span>Homes guests are heading right now.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-250">
        <div className="relative bg-[url('/images/GreenSpringHomes1.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 w-full sm:w-70 h-40 rounded-2xl before:rounded-2xl">
        <div className='absolute bottom-0 text-white px-4 py-2'>
            <h1>Lagos</h1>
            <p>2 homes</p>
        </div>
        </div>
        <div className="relative bg-[url('/images/Quick3.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 w-full sm:w-70 h-40 rounded-2xl before:rounded-2xl">
        <div className='absolute bottom-0 text-white px-4 py-2'>
            <h1>Abuja</h1>
            <p>2 homes</p>
        </div>
        </div>
        <div className="relative bg-[url('/images/Quick2.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 w-full sm:w-70 h-40 rounded-2xl before:rounded-2xl">
        <div className='absolute bottom-0 text-white px-4 py-2'>
            <h1>Ibadan</h1>
            <p>1 home</p>
        </div>
        </div>
        
    </div>
    </section>
  )
}

export default PopularDestinations