import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { useContext } from 'react';
import { PlayerContext } from '../Context/PlayerContext';


const DisplayAlbum = () => {
    
    const {id} = useParams();
    console.log('id:', id);
   //const albumData = albumsData[id];
   const {playWithId} =useContext(PlayerContext)
    
    

    
  return (
    <>
   <Navbar />
<div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
    <img src={albumsData.image} alt={`${albumsData.name} cover`} />
    <div className="flex flex-col justify-between"> {/* Added flex and justify-between to ensure the div takes full height */}
        <div className="flex flex-col gap-2"> {/* Added gap-2 to create space between child elements */}
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumsData.name}</h2>
            <h4>{albumsData.desc}</h4>
            <p className='mt-1'>
                <img className='inline-block w-5' src={assets.spotify_logo} alt="Spotify logo" />
                <b>Spotify</b> . 1,323,153 likes . <b>50 songs,</b> about 2 hr 30 min
            </p>
        </div>
    </div>
</div>
<div>
    <div className='grid grid-cols-3 sm:grid-cols-4 mt-0 mb-4 text-[#a7a7a7]'>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="Clock icon" />
    </div>
    <hr />
    {
        songsData.map((item, index) => (
            <div onClick={()=>playWithId(item.id)}  key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] mt-10 cursor-pointer'>
                <p className='text-white'>
                    <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                    <img className='inline w-10 mr-5' src={item.image} alt={`${item.name} cover`} />
                    {item.name}
                </p>
                <p className='text-[15px]'>{albumsData.name}</p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center'>{item.duration}</p>
            </div>
        ))
    }
</div>

    </>
  )
}

export default DisplayAlbum