import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PlayAsXToggle from "../../components/PlayAsXToggle";

export const AiMenu = ({ togglePlayerisX, playerIsX, robotMenuClick }) => {

  
  const routeNavigator = useRouteNavigator();

  const handleRobotMenuClick = (difficult) => {
    robotMenuClick(difficult);
    routeNavigator.push('/bigBoard');
  }

  return (
    <div>
      <h2>Select the AI difficulty level</h2>
      <button
        className="resetButton"
        onClick={() => {
          handleRobotMenuClick(1);
        }}
      >
        Beginner
      </button>
      <button
        className="resetButton"
        onClick={() => {
          handleRobotMenuClick(2);
        }}
      >
        Intermediate
      </button>
      <button
        className="resetButton"
        onClick={() => {
          handleRobotMenuClick(3);
        }}
      >
        Expert
      </button>
      <button
        className="resetButton"
        onClick={() => {
          handleRobotMenuClick(4);
        }}
      >
        Master
      </button>
      <PlayAsXToggle playerIsX={playerIsX} togglePlayerisX={togglePlayerisX} />
    </div>
  );
}
