import React, { useState } from 'react';

const TicketContext = React.createContext({
    selectedTicket: null,
    setSelectedTicket: () => { },
});


export const TicketContextProvider = (props) => {

    const [selectedTicket, setSelectedTicket] = useState(null);


    const onChangeSelectedTicket = (newValue) => {
        setSelectedTicket(newValue);
    }

    const contextValue = {
        selectedTicket: selectedTicket,
        setSelectedTicket: onChangeSelectedTicket,
    }


    return <TicketContext.Provider value={contextValue}>
        {props.children}
    </TicketContext.Provider>
}

export default TicketContext;