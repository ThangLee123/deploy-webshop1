import Footer from '../components/Footer';
import SubHeader from '../components/SubHeader';

function SubHeaderOnly({ children }) {
    return (
        <div>
            <SubHeader />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer isSearchProductPage />
        </div>
    );
}

export default SubHeaderOnly;
