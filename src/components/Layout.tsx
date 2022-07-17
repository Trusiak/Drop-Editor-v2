import React, {useState, useEffect, useMemo, useContext} from 'react';
import Header from './Header/Header';
import List from './Lists/List';
import Footer from './Footer/Footer';
import { GlobalContext } from './../context/GlobalState';
import { convertTextData } from "../helpers/dataConverter";
import { convertMobDroptoJSON } from '../helpers/mobDropToJsonConverter';
import Loader from './Loader/Loader';
import AddMobList from './Lists/MobList/AddMobList/AddMobList';
 
const Layout = () => {
    const [loading, setLoading] = useState(true);
    
    const { firstRun, dropListCopy, addMobNames, addItemNames, addDrop, createDeepDropCopy } = useContext(GlobalContext) as any;

  
    useEffect(() => {

        const fetchItemNames = fetch('/item_names.txt')
            .then((response) => response.text())
            .then(data  => {
                 const itemNames = convertTextData(data, "item")
                addItemNames(itemNames) 
            })
            .catch(err => console.warn(err)) 
  
          const fetchMobNames = fetch('/mob_names.txt')
            .then((response) => response.text())
            .then(data  => {
                const mobNames = convertTextData(data, "mob")
                addMobNames(mobNames)
            })
            .catch(err => console.warn(err)) 
  
            // This will be work on production, now disabled 
  
            const fetchMobDrop = fetch('/testowe/mob_drop_item.txt')
            .then((response) => response.text())
            .then(data  => {
              const mobDrop = convertMobDroptoJSON(data)
                addDrop(mobDrop)
            })
            .catch(err => console.warn(err)) 
  
           
  
            Promise.all([fetchItemNames, fetchMobNames, fetchMobDrop]).then((values) => {
                  createDeepDropCopy();
                  setLoading(false);
            });

      }, []);

    return useMemo(()=> {
        return (
            <div className='Layout'>
                <Header/>
                <AddMobList/>
                { loading ? 
                    (<Loader/>) 
                :
                    (<List dropList={dropListCopy}/>)
                }
                <Footer/>
            </div>)
    }, [loading, dropListCopy])
};

export default Layout;