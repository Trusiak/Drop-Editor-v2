import React, {useEffect, useState} from 'react';
import { convertItemId } from '../../../helpers/itemIdConverter';

interface MobItemIconProps {
    itemId: number,
    itemName?: string
}

const MobItemIcon: React.FC<MobItemIconProps> = React.memo(({itemId, itemName}) => {
      const [img, setImg] = useState('');

      const fetchImage = React.useCallback(async () => {
        try {
          const res = await fetch(`/images/items/${convertItemId(itemId, itemName)}.png`);
          if (res.status !== 200) {
            throw new Error('Ups');
          }
          /* const imageBlob = await res.blob();

          if (imageBlob.type !== 'image/png') {
            setImg(`https://img.m2icondb.com/${convertItemId(itemId, itemName)}.png`);
          }
          else{
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
          } */
          
        } catch (e) {
          setImg('/images/unknown-icon.png');
        }
      }, [itemId, itemName]);

      const handleImageError = (e: any) => {
        e.target.error = null;
        e.target.src="/images/unknown-icon.png";
    }
  
      useEffect(() => {
        //fetchImage().then();
      }, [fetchImage]);
      return (
        <>
            <img className="MobItemIcon__icon" src={`/images/items/${convertItemId(itemId, itemName)}.png`} alt={""} onError={(e)=> handleImageError(e)} />
        </>
      );
    },
    (prevProps, nextProps) => prevProps.itemId === nextProps.itemId
  );

  export default MobItemIcon;