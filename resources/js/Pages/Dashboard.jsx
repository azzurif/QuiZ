import CreateButton from "@/Components/CreateButton";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination";
import Card from "@/Components/Quiz/Card";
import Layout from "@/Layouts/Layout";

export default function Dashboard({ auth, quizzes }) {
    return (
        <Layout auth={auth.user} header="Dashboard" title="Dashboard">
            <div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Header>Your Quiz</Header>
                        <CreateButton href={route("quiz.create")}>
                            Create Quiz
                        </CreateButton>
                    </div>
                    <Card quizzes={quizzes.data} show={true} />
                    <Pagination links={quizzes.links} />
                </div>
            </div>
        </Layout>
    );
}
