import { Card } from 'antd'
const { Meta } = Card

export default function OneLetter({ letter, setLetter }) {
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img
            className="card-image"
            alt="love-letter"
            src="https://cdn.pixabay.com/photo/2016/04/10/21/28/animal-1320792_1280.png"
          />
        }
      >
        <div className="card-text">
          <Meta title={letter.recipient} description={[`${letter.message}, ${letter.sender}`]} />
        </div>
      </Card>
    </div>
  )
}
