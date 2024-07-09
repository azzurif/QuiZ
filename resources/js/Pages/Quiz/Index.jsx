import Card from "@/Components/Quiz/Card";
import Layout from "@/Layouts/Layout";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Quiz/Search";

const Index = ({ auth, quizzes }) => {
    return (
        <Layout
            auth={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    Quizzes
                    <Search />
                </div>
            }
            title="Quizzes"
        >
            <Card quizzes={quizzes.data} show={false} />
            <Pagination links={quizzes.links} />
        </Layout>
    );
};

export default Index;
