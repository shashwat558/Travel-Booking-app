

type Props = {
    title: string;
    description: string;
    photo: string[];
    owner: string;
    maxGuest: number;
    perks: string[];
}

const limitText = (text:string, wordLimit: number): string => {
    const words = text.split('');
    if(words.length <= wordLimit){
        return text;
    } else {
        return words.slice(0, wordLimit).join(' ') + "....";
    }

}

const PlacesCard = ({title, description, photo, owner, maxGuest, perks}: Props) => {
    
  return (
    <div className='w-full p-4 border-[2px] border-gray-600 rounded-md shadow-sm'>
        <div className='flex justify-between item-center p-2'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-semibold text-gray-900 tracking-normal'>{title}</h2>
                <div className='opacity-50 text-[7px] text-black'>Owner: {owner}</div>
                <p className='text-wrap text-gray-700 tracking-tight'>{limitText(description, 30)}</p>
                <div>Perks include: {perks.map((perk) => (
                    <span className='opacity-70'>{perk}, </span>
                ))}</div>
                <div className='text-gray-600 tracking-tighter'>Max. Guests: {maxGuest}</div>
            </div>
            <div className='rounded-md'>
                <img src={photo[0]} alt="Place's image" width={200} height={200}/>
            </div>
        </div>
    </div>
  )
}

export default PlacesCard