//Item names and mob names converter

export function convertTextData(data: any, type: any){
  const textNames =
    data
        .split('\n')
      // @ts-ignore
        .map(el=>{
            let tmp = el.split('\t');
            tmp[0] = parseInt(tmp[0])
            return tmp
        })
      // @ts-ignore
        .filter(el=> el.length > 1)
      // @ts-ignore
        .reduce((p, n) => {
             p.push({
                value: n[0],
                label: `${n[1]} (${n[0]})`
            })
            return p 
        }, [])

        textNames.shift()

    return textNames;
}
