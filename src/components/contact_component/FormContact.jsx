import React from 'react'

function FormContact() {
  return (
    <div className='flex px-[150px] gap-5 min-h-screen'>
      <div className='w-[50%]'>
          <div>
            <p className=' text-[15px] font-semibold'>Don't be a stranger!</p>
            <p className=' text-[42px] font-semibold mb-[25px]'>You tell us. We listen.</p>
            <p className=' text-[16px] w-[80%]'>Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et. Nam mattis est sed tellus.</p>
          </div>
      </div>
      <div className='w-[50%] '>
        <form className='w-full flex gap-[20px] flex-col px-[30px] py-[40px] bg-white' >
            <input type="text" placeholder='NAME' className=' pl-3 border-[2px] h-[50px]'/>
            <input type="text" placeholder='SUBJECT' className=' pl-3 border-[2px] h-[50px]' />
            <input type="text" placeholder='EMAIL' className=' pl-3 border-[2px] h-[50px]'/>
            <textarea name="" placeholder='MESSAGE' className=' p-3 border-[2px]' id="" cols="30" rows="10"></textarea>
            <button className='h-[50px] w-[40%] font-semibold text-lg text-white bg-[#263b61]'> SEND MESSAGE</button>
        </form>
      </div>
    </div>
  )
}

export default FormContact