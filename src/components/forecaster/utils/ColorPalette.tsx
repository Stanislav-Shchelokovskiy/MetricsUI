import { Belonging } from './Meta'

const palette: { [index: string]: string } = {
    fact: 'rgb(245,0,245)',
    forecast: 'rgb(0,120,245)',
    forecast_fill: 'rgba(195,195,195,0.5)',
    forecast_boundary: 'rgba(195,195,195,0.5)',
    primary_tribe_support: '', //0
    secondary_tribe_support: 'rgb(166,86,40)',//1
    primary_tribe_team: 'rgb(136,34,85)', //2
    different_tribe: 'rgb(120,80,0)', //3
    grid_line: 'rgba(190,190,190,0.3)',
    tribe_replies: 'rgb(255,128,64)',
    tribe_replies_greater_fill: 'rgb(179,255,174,0.4)',
    tribe_replies_lower_fill: 'rgb(255,100,100,0.7)',
    transparent: 'rgba(0,0,0,0)',
    vline: 'green',
}

const GetColor: (key: string) => string = function (key) {
    return palette[key]
}

export default GetColor
