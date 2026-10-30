const WhyUs = () => {
    const reasons = [
        {
        title:"Verified Properties",
        des:"Every published home is reviewed and verified by our team before it goes live.",
    },
        {
        title:"Secure Booking",
        des:"Transparent pricing, clear policies and a booking record you can always check.",
    },
        {
        title:"Flexible Stays",
        des:"Book a weekend, a month or a long stay — with pricing that adapts.",
    },
        {
        title:"24/7 Support",
        des:"Real help before, during and after your stay.",
    },
]
  return (
    <section className=' px-8 py-20 lg:px-28 border border-gray-300'>
        <h1 className='text-2xl font-bold mb-4'>Why Green<span className="text-green-500">Spring</span>Homes</h1>
        <div className='grid sm:grid-cols-2  md:grid-cols-4 gap-5'>
            {
               reasons.map((reason) => (
                <div
                    key={reason.title}
                    className="flex flex-col items-start justify-end rounded-2xl border border-gray-300 px-4 py-4"
                >
                        <h1 className='text-xl mb-2'>{reason.title}</h1>
                        <p className='text-sm'>{reason.des}</p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default WhyUs