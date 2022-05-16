import React from 'react';
import { convertItemId } from '../../../../../helpers/itemIdConverter';

interface MobItemIconProps {
    itemId: number,
    itemName: string
}

const MobItemIcon: React.FC<MobItemIconProps> = ({itemId, itemName}) => {

    const imageSource = `https://m2icondb.com/img/${convertItemId(itemId, itemName)}.png`;

    const handleImageError = (e: any, id:number, name: string) => {
        e.target.error = null;
        e.target.src="/images/unknown-icon.png";
/*         try{
           let eme: any =  e.target.src=`/items/${convertItemId(item.id, itemName)}.png`;
        }
        catch(error){
            e.target.src="/images/unknown-icon.png";
        } */
        //`https://m2icondb.com/img/${convertItemId(item.id, itemName)}.png`
    }

    return (
            <div className="MobItemIcon__icon-wrapper">
                <img className="MobItemIcon__icon"  src={imageSource} onError={(e)=> handleImageError(e, itemId, itemName)} alt=" "/>
            </div>
    );
};

export default MobItemIcon;


/* const MyIcon: React.FC<{ item: { id: string; name: string } }> = React.memo(
    ({ item }) => {
      const [img, setImg] = useState('');
      const fetchImage = React.useCallback(async () => {
        try {
          const res = await fetch(`https://img.m2icondb.com/${item.id}.png`);
          if (res.status !== 200) {
            throw new Error('Ups');
          }
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
        } catch (e) {
          setImg('/img/travel-coupon-emblem.png');
        }
      }, [item]);
  
      useEffect(() => {
        fetchImage().then();
      }, [fetchImage]);
      return (
        <>
          <img src={img} alt={item.name} />
        </>
      );
    },
    (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
  ); */