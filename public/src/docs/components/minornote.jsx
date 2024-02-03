export default function MinorNote({ note }) {
    return (
        <div className='minornote'>
            <img className='noteicon' src='https://cdn.polarlab.app/src/docs/img/minor.png'></img>
            <p className='notetext'>
               {note}
            </p>
        </div>
    );
 }