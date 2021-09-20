import './about.css';
import fashion from '../../../../images/fashion.png';
import flex from '../../../../images/flex.png';
import sustain from '../../../../images/sustain.png';
import tag from '../../../../images/tag.png';
import clothing from '../../../../images/clothing.jpg';

const AboutUs = () => {
    return (
        <div class="about-container">
            <div class="container-fluid p-0 m-0">
                <div class="row p-0 m-0">
                    <div class="col col-12 col-sm-12 col-md-12 aboutUs p-0">
                        <headings class="aboutUs">
                            <h2>About Us</h2>
                        </headings>
                    </div>

                    <div class="col col-12 col-sm-12 col-md-6 align-items-center px-5 mt-5 mb-5">
                        <h3 class="font-weight-bold text-left ">
                            A community that shares more than just clothes.{' '}
                        </h3>

                        <p class="text-left">
                            <br></br>We’re not just a closet; we’re a community
                            — one that swaps everything from clothes, to
                            inspiration and ideas. When we’re able to wear what
                            makes us feel our best, we can be our best selves.
                            And with the Closet in the Cloud, we can more freely
                            express ourselves. We encourage our members to
                            explore all the different aspects of their style,
                            whether it’s renting an outfit for every day, or
                            finding a pre-loved designer piece to keep forever.
                        </p>
                    </div>

                    <div class="col col-12 col-sm-12 col-md-6 m-0 p-0 px-5 mt-5 mb-5">
                        <img src={clothing} class="img-fluid" alt="" />
                    </div>

                    <div class="media col-md-6 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={fashion}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Fashion Freedom</h5>
                            <p>
                                Explore different styles, discover designers,
                                and try new things from the largest designer
                                rental closet.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 offset-md-4 col-12 px-5 py-3 m-0 mb-5">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={tag}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Total Flexibility</h5>
                            <p>
                                Let's be real: your style, size, and budget
                                change over time. Now, your closet can too.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={flex}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Forget the Price Tag</h5>
                            <p>
                                Finally the solution to wearing everything you
                                want, no purchase necessary.
                            </p>
                        </div>
                    </div>

                    <div class="media col-md-6 offset-md-4 col-12 px-5 py-3 m-0 mb-5 ">
                        <img
                            class="align-self-start mr-3 img-thumbnail"
                            src={sustain}
                            alt="Generic placeholder"
                        />
                        <div class="media-body">
                            <h5 class="mt-0">Sustainable Footprint</h5>
                            <p>
                                Most clothes we buy end up in the back of
                                closets or landfills. Power the sharing economy
                                and rent instead.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
