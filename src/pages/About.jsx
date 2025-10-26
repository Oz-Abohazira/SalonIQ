import React from 'react'
import { assets } from '../assets/assets'

const About = () => {

  const chooseData = [
    {
      subTitle: "Experience:",
      Text: "",
    },
    {
      subTitle: "Personal Touch:",
      Text: "",
    },
    {
      subTitle: "Style:",
      Text: "",
    },
  ]

  return (
    <div>

      <div className='text-center text-2xl pt-10'>
        <p className='text-gray-700 font-medium'>About <span>Me</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-700'>
          <p>
            Hi, I’m Hannah — a licensed cosmetologist with over 14 years of experience bringing hair dreams to life!
            Ever since earning my cosmetology license, I’ve been passionate about helping people look and feel their absolute best.
            From precision cuts and gorgeous color to seamless extensions and creative styling,
            I love transforming hair while making every client feel confident and cared for.
          </p>

          <p>
            My journey has taken me all over the world — 6 amazing years in Philadelphia,
            3 inspiring years in Jerusalem, 3 exciting years in Tel Aviv, and now 2 wonderful years here in Atlanta.
            Each place has taught me something new about beauty, culture, and connection,
            and I’m so grateful for every client who’s sat in my chair along the way.
          </p>

          <p>
            I’ve worked with every hair type and texture imaginable, and I truly believe everyone deserves hair that makes them feel incredible.
            Whether you’re looking for a fresh new style, a bold color change, or extensions that blend perfectly,
            I’m here to make it happen with creativity, care, and a whole lot of love.
          </p>

          <p className='font-medium text-gray-800'>
            Can’t wait to see you in my chair!
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>Why <span className='font-medium'>Choose Me</span></p>
      </div>

      <div>
        <div>
          <b>
          </b>
          <p>
          </p>
        </div>
      </div>





    </div>
  )
}

export default About