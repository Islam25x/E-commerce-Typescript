import { Container, Row, Col } from 'react-bootstrap'
import { useAppSelector } from '../../Redux/Store'
import NavHomeAcc from '../../nav/navHomeAcc'
import NavHome from '../../nav/NavHome'
import './AboutTop.css'
const AboutTop = () => {

    const IsLogin = useAppSelector((state)=> state.user.IsLogin)
    return (
        <section id='AboutTop'>
            {IsLogin ?
                <NavHomeAcc /> :
                <NavHome />
            }
            <Container>
                <p className='Path'>Account / <span className='text-dark'>About</span></p>
                <Row>
                    <Col lg={6} md={6} sm={12} className='mt-4'>
                        <h1 className='my-5'>Our Story</h1>
                        <p className='mb-4'>
                            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh.
                            Supported by wide range of tailored marketing, data and service solutions,
                            Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                        </p>
                        <p>
                            Exclusive has more than 1 Million products to offer,
                            growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <img src="https://s3-alpha-sig.figma.com/img/fcc8/9aaa/7b85f8c1dcce81e71e2eb178be13bd4d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pi9jd2c2anGqpDi-hVGp~up5rsuRKCAIOohTUstcR91DqlDRNw978h9WSC85p5VHxf0eLGo3ysPh7jr2~9TI1UO05F8Gz~uylT3Xkc7xFWb7o~XjbPnQ5yDwCn805dZKGPO7aR8lKsSIEugMNY3X5PEsecJHXOzJ1OcnJ8uzr0XWhkIIuq8kVf1VdfopG6hlgsWxaBdmo3R2wBLMs9vOcHxuhFux2VKoaNjI9cB~iaVeCmguijNq7xP56D0X~tiGm-tk2QEGHxDbhVgbPlqFJds97rEw4kU149KP-UsVXUGL4lARG7Py6nqN6j9QS~7IXTO03Uh5mPBf0V~ywsqQdw__" alt="About" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutTop