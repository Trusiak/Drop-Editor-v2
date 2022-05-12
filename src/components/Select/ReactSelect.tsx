import React from 'react';
import Select, { createFilter } from 'react-select'
import { FixedSizeList as List } from "react-window";
// @ts-ignore
const ReactSelect: any = ({setChosenItem, classPrefix="ReactSelect", options, defaultValue, value, className, portalTarget}) => {
    return (
        <Select 
                onChange={setChosenItem} 
                classNamePrefix={classPrefix} 
                className={className} 
                options={options} 
                placeholder="Wybierz..."
                components={{ MenuList } as any}
                menuPortalTarget={portalTarget}
                required
                filterOption={createFilter({ignoreAccents: false})}
             />
    );
};

export default ReactSelect;

class MenuList extends React.Component {
    render() {

      // @ts-ignore
      const { options, children, maxHeight, getValue } = this.props as any;
      const height = 35;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
  
      return (
        <List
          width={'auto'}
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }
