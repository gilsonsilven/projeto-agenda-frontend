import Image from 'next/image';

export default function HomePageImage() {
    return (
        
        <Image className='size-full'
            src={"/img/homepageImage.jpg"}
            alt='Imagem de uma agenda sobre um calendário'
            height={1500}
            width={750}
        />
    )
}