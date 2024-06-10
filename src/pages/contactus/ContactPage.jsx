import React from 'react'
import Navbar from '../../components/Navbar'
import contactImg from '../../assets/contact_page_images/contact.jpg'
import FormContact from '../../components/contact_component/FormContact'
import Footer from '../../components/Footer'


const ContactPage = () => {

  const aboutBackground = {
    backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),url(${contactImg})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    opacity: 0.6,
  }
  const containerStyle = {
    position: 'relative',
  };

  const textStyle = {
    position: 'absolute',
    top: '50%', // Adjust as needed to vertically center the text
    left: '50%', // Adjust as needed to horizontally center the text
    transform: 'translate(-50%, -50%)', // Center the text using CSS transform
    color: 'white', // Text color, // Adjust as needed
    // Add other text styles as needed
  };



  const cardinfo = [
    { title: 'Sales', desc: 'Vestibulum ante ipsum primis in faucibus orci luctus.', number: '1800 123 4567' },
    { title: 'Complaints', desc: 'Vestibulum ante ipsum primis in faucibus orci luctus.', number: '1900 223 8899' },
    { title: 'Returns', desc: 'Vestibulum ante ipsum primis in faucibus orci luctus.', number: 'returns@mail.com' },
    { title: 'Marketing', desc: 'Vestibulum ante ipsum primis in faucibus orci luctus.', number: 'returns@mail.com' },
  ]

  return (
    <div className=' bg-[#F5F7F9]'>
      <Navbar />
      <div style={containerStyle} >
        <div style={aboutBackground} className='w-full md:h-[50vh] flex justify-center items-center'>

        </div>
        <p style={textStyle} className=' text-[66px] font-semibold'>Contact Us</p>
      </div>

      <div className='w-full py-[70px] ' >
        <div className='flex flex-col items-center justify-center'>
          <p className=' text-[18px] font-semibold '>Have any queries?</p>
          <p className=' text-[42px] font-semibold '>We're here to help.​</p>
          <div class=" border-b-2 w-[50px] border-black mt-[15px]"></div>


        </div>

        <div className='flex px-[150px] gap-5 mt-[30px]'>
          {
            cardinfo?.map((details, index) => (
              <div key={index} className='flex flex-col bg-white gap-3 p-6 justify-center items-center border border-gray-200 rounded-md shadow-md transition-transform  hover:shadow-2xl' >
                <p className='text-[26px] font-semibold'>{details.title}</p>
                <p className=' text-center '>{details.desc}</p>
                <p className='text-[18px] text-blue-700 font-semibold'>{details.number}</p>
              </div>
            ))
          }
        </div>


      </div>

      <FormContact/>


          <Footer/>
    </div>
  )
}

export default ContactPage