import React from 'react'

const Map = () => {

    const style={
        maxWidth:'1200px',
        height:'600px',
        textAlign:'center',
        display:'flex',
        justifyContent:'center'
    }
  return (
    <div className=" pl-lg-5">
      <section className="map-section">
        <div className="contact-map" style={style}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.7676120504622!2d10.344088676241986!3d44.83743878927137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478040228fc08d27%3A0x96cf4a4faf5e46ac!2sVia%20Paradigna%2C%20133%2C%2043122%20Paradigna%20PR%2C%20Italy!5e1!3m2!1sen!2set!4v1751051038105!5m2!1sen!2set"
            width="1000"
            height="470"
            
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>         
        </div>
      </section>
    </div>
  );
}

export default Map