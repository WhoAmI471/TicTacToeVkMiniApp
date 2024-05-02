import { useState } from 'react';
import { 
    Panel,
    PanelHeader, 
    Group, 
    ModalRoot, 
    ModalCard,
    SplitLayout,
    Div
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './Shop.css';

export const Shop = ({ id }) => {

    const [activeModal, setActiveModal] = useState('');
    const routeNavigator = useRouteNavigator();
    
    const modal = (

        <ModalRoot activeModal={activeModal}>
            <ModalCard id="smallBoardWithFriend" onClose={() => setActiveModal(null)}>
                <Group style={{display:'flex'}}>

                </Group>
            </ModalCard>
        </ModalRoot>
    
    );

    return(
        <SplitLayout modal={modal}>
            <Panel id={id}>     
                <PanelHeader>
                    Крестики нолики
                </PanelHeader>


            </Panel>
         </SplitLayout>
      
    )
}

