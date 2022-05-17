import React, {useEffect, useState} from 'react';
import { convertItemId } from '../../../helpers/itemIdConverter';

interface MobItemIconProps {
    itemId: number,
    itemName?: string
}

/* const MobItemIcon: React.FC<MobItemIconProps> = ({itemId, itemName}) => {

    const imageSource = `https://m2icondb.com/img/${convertItemId(itemId, itemName)}.png`;

    const handleImageError = (e: any, id:number, name: string) => {
        e.target.error = null;
        e.target.src="/images/unknown-icon.png";
    }

    return (
            <div className="MobItemIcon__icon-wrapper">
                <img className="MobItemIcon__icon"  src={imageSource} onError={(e)=> handleImageError(e, itemId, itemName)} alt=" "/>
            </div>
    );
}; */


const MobItemIcon: React.FC<MobItemIconProps> = React.memo(({itemId, itemName}) => {
      const [img, setImg] = useState('');

      const fetchImage = React.useCallback(async () => {
        try {
          const res = await fetch(`/item-icons/${itemId}.png`);
          if (res.status !== 200) {
            throw new Error('Ups');
          }
          const imageBlob = await res.blob();

          if (imageBlob.type !== 'image/png') {
            setImg(`https://img.m2icondb.com/${convertItemId(itemId, itemName)}.png`);
          }
          else{
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
          }
          
        } catch (e) {
          setImg('/images/unknown-icon.png');
        }
      }, [itemId, itemName]);

      const handleImageError = (e: any) => {
        e.target.error = null;
        e.target.src="/images/unknown-icon.png";
    }
  
      useEffect(() => {
        fetchImage().then();
      }, [fetchImage]);
      return (
        <>
            <img className="MobItemIcon__icon"  src={img} alt={""} onError={(e)=> handleImageError(e)} />
        </>
      );
    },
    (prevProps, nextProps) => prevProps.itemId === nextProps.itemId
  );

/* const MobItemIcon: React.FC<MobItemIconProps> = React.memo(({itemId, itemName}) => {
      const [img, setImg] = useState('');
      const fetchImage = React.useCallback(async () => {
        try {
          const res = await fetch(`https://img.m2icondb.com/${itemId}.png`);
          if (res.status !== 200) {
            throw new Error('Ups');
          }
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
        } catch (e) {
          setImg('/images/unknown-icon.png');
        }
      }, [itemId, itemName]);
  
      useEffect(() => {
        fetchImage().then();
      }, [fetchImage]);
      return (
        <>
        <div className="MobItemIcon__icon-wrapper">
                <img className="MobItemIcon__icon"  src={img} alt={""}/>
            </div>
        </>
      );
    },
    (prevProps, nextProps) => prevProps.itemId === nextProps.itemId
  ); */

  export default MobItemIcon;