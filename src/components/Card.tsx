export function Card({ items, html, onOpen }) {
  console.log('render', items);
  return (
    <div onClick={onOpen}>
      <img src="/logo.png" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ul>{items.map((i) => <li>{i.name}</li>)}</ul>
    </div>
  );
}
