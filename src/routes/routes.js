import Setup from '../components/Setup';
import Join from '../components/Join';
import Game from '../components/Game';
export const routes = [
    { path:'/', component: Setup } ,
    { path:'/join', component: Join } ,
    { path:'/game/:room/:role/:allegiance?', component: Game },
    { path:'*', component: Setup}
] 