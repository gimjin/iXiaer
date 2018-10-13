export default function say() {
  return 'Hello World!';
}

export function getData() {
  return new Promise((resolve, reject) => {
    resolve('ok');
  })
}
