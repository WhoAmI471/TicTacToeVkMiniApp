import { useState } from 'react';
import { 
    Panel,
    PanelHeader, 
    Card, 
    CardGrid, 
    Text, 
    Button, 
    Group, 
    ModalRoot, 
    ModalCard,
    SplitLayout
} from '@vkontakte/vkui';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './Home.css';

import circle from '../../assets/circle.svg';
import slah from '../../assets/slah.svg';
import cancel from '../../assets/cancel.svg';
import onePlayer from '../../assets/onePlayer.svg';
import twoPlayer from '../../assets/twoPlayer.svg';
import onlineGame from '../../assets/onlineGame.svg';
import iconGame from '../../assets/iconGame.svg'


export const Home = ({ id, setStatus, setBotActive, setBotLevel, setBoardSize, robotMenuClick, SendLinkGame }) => {

    const [activeModal, setActiveModal] = useState('');

    const routeNavigator = useRouteNavigator();

    const modal = (
        <ModalRoot activeModal={activeModal}>
            <ModalCard id="smallBoardWithFriend" onClose={() => setActiveModal(null)}>
                <Group style={{display:'flex'}}>
                    <Button
                     className="resetButton" 
                     onClick={() => playerScreenClickSmallBoard(3)}
                     size="l" appearance="accent" mode="secondary" stretched
                     > 3x3 </Button>
                    <Button 
                    className="resetButton TwO" 
                    onClick={() => playerScreenClickSmallBoard(5)}
                    size="l" appearance="accent" mode="secondary" stretched
                    >
                     5x5 </Button>
                </Group>
            </ModalCard>
            
            <ModalCard id="bigBoardWithFriend" onClose={() => setActiveModal(null)}>
                <Text style={{fontSize:'16pt', fontWeight:'500pt',marginBottom:'15px',textAlign:'center'}}>Выберите сложность:</Text>
                <Button
                    className="resetButton"
                    onClick={() => {
                        handleRobotMenuClick(1);
                    }}
                    size="l" appearance="accent" mode="secondary" stretched
                >
                    Легкий
                </Button>
                <Button
                    className="resetButton"
                    onClick={() => {
                        handleRobotMenuClick(2);
                    }}
                    size="l" appearance="accent" mode="secondary" stretched
                >
                    Средний
                </Button>
                <Button
                    className="resetButton"
                    onClick={() => {
                        handleRobotMenuClick(3);
                    }}
                    size="l" appearance="accent" mode="secondary" stretched
                >
                    Сложный
                </Button>
                <Button
                    className="resetButton"
                    onClick={() => {
                        handleRobotMenuClick(4);
                    }}
                    size="l" appearance="accent" mode="secondary" stretched
                >
                    Мастерский
                </Button>
            </ModalCard>
        </ModalRoot>
    );

    
    const handleRobotMenuClick = (difficult) => {
        robotMenuClick(difficult);
        routeNavigator.push('/bigBoard');
    }

    const singleplayerClick = () => {
        setBotActive(true);
        setBotLevel("easy");
        setBoardSize(3);

        routeNavigator.push('smallBoard');
    }

    const playerScreenClickSmallBoard = (boardSize) => {
        setBotActive(false);
        setBotLevel("easy");
        setBoardSize(boardSize);

        routeNavigator.push('smallBoard');
    };

    const handle2PlayerScreenClick = () => {
        routeNavigator.push('bigBoard');
        setStatus("localGame");
    };

    const handle2PlayerOnlineClick = () => {
        SendLinkGame();
        routeNavigator.push('OnlineBigBoard');
        setStatus("OnlineBigBoard");
    };


    return(
        <SplitLayout modal={modal}>
            <Panel id={id}>
                {/* Хедер приложения */}
                <PanelHeader>
                    Крестики нолики
                </PanelHeader>

                {/* Там где место в рейтинге и выбор кастома  */}
                <CardGrid size="m" style={{marginTop: '10px'}}>

                        <Card className="rating-card">
                            <Text className="name-card-home" >Место в рейтинге:</Text>
                            <Text className="namber-rating">1435</Text>
                        </Card>

                        <Card className="rating-card">
                            <Text className="name-card-home">Выбрать скин:</Text>
                            <div className="skin-card" style={{paddingBottom:'15.02px', marginTop:'6px'}}>
                                <img src={cancel} alt="" style={{marginLeft: '5px'}}/>
                            
                                <img src={slah} alt="" style={{marginLeft: '5px'}}/>
                                <img src={circle} alt="" />
                            </div>         
                        </Card>
                </CardGrid>

                {/* 3 на 3 крестики нолики  */}
                <CardGrid size="l">
                    <Card className="card-ordinary-game" mode="shadow">

                        <Text className="name-card-game">Классические</Text> 

                        <CardGrid size="m"> 
                           
                            <Card className="fon1" onClick={singleplayerClick}>
                              
                                    <div className="bot-game">
                                        <Text className="name-card-home" style={{color: 'white', marginLeft: '12px'}}>C ботом</Text>
                                        <div className="icon-player">
                                            <img style={{width:'101px', height:'110px',position: 'relative',left:'10px',marginTop:'20px'}} src={onePlayer} alt="" />
                                        </div>                              
                                    </div> 
                                                  
                            </Card>
                            
                            <Card className='fon2' onClick={() => setActiveModal('smallBoardWithFriend')} style={{marginTop:'0px',marginLeft:'8px',marginBottom:'16px'}}>
                                <div className="player-game">
                                    <Text className="name-card-home" style={{color: 'white', marginLeft: '12px'}}>C другом</Text>
                                    <div className="icon-player">
                                        <img style={{width:'133px', height:'99px',position: 'relative',marginTop:'27px'}} src={twoPlayer} alt="" />
                                    </div>                                
                                </div>                       
                            </Card>
                
                        </CardGrid>
                    </Card>
                </CardGrid>

                {/* Игра большие крестики нолики */}
                <CardGrid size="l">
                    <Card className="card-ordinary-game" mode="shadow">

                        <Text className="name-card-game">Большие</Text> 

                        <CardGrid size="s"> 

                            <Card className="fon1" onClick={() => setActiveModal('bigBoardWithFriend')}>
                                <div className="bot-game">
                                    <Text className="name-card-home" style={{color: 'white', marginLeft: '12px'}}>C ботом</Text>
                                    <div className="icon-player-big">
                                        <img style={{width:'75px',position: 'relative',right:'5px',top:'10px'}} src={onePlayer} alt="" />
                                    </div>                              
                                </div>                       
                            </Card>

                            <Card className='fon2' onClick={handle2PlayerScreenClick} style={{marginTop:'0px',marginLeft:'8px',marginBottom:'16px'}}>
                                <div className="player-game">
                                    <Text className="name-card-home" style={{color: 'white', marginLeft: '12px'}}>C другом</Text>
                                    <div className="icon-player">
                                        <img style={{width:'95px',position: 'relative',top:'10px'}} src={twoPlayer} alt="" />
                                    </div>                                
                                </div>                       
                            </Card>

                            <Card className='fon3' onClick={handle2PlayerOnlineClick} style={{marginTop:'0px',marginLeft:'8px',marginBottom:'16px'}}>
                                <div className="online-game">
                                    <Text className="name-card-home" style={{color: 'white', marginLeft: '12px'}}>По сети</Text>
                                    <div className="icon-player">
                                        <img style={{width:'133px', height:'99px',position: 'relative',left:'30px',marginTop:'35px'}} src={onlineGame} alt="" />
                                    </div>                                
                                </div>                       
                            </Card>
                        </CardGrid>

                        <div className="rules-game">
                            <img src={iconGame} alt="" style={{width: '20px'}}/>
                            <Text style={{color:'#2688EB',marginLeft:'4px'}}>Правила игры</Text>
                        </div>
                    </Card>
                </CardGrid>
            </Panel>
        </SplitLayout>
    )
}

