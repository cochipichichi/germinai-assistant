export const readSensors = ()=> fetch('./data/sensors.json').then(r=>r.json());
export const readCalendar = ()=> fetch('./data/calendar.json').then(r=>r.json());
export const readRules = ()=> fetch('../rules/default.json').then(r=>r.json());
export const readLots = ()=> fetch('./data/lots.json').then(r=>r.json());
export const readHistory = ()=> fetch('./data/history.json').then(r=>r.json());
export async function readModel(species){
  const map={tomato:'../models/tomato.json',lettuce:'../models/lettuce.json'};
  return fetch(map[species]||map.tomato).then(r=>r.json());
}
