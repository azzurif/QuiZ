import { router } from "@inertiajs/react";
import CreateButton from "@/Components/CreateButton";
import Card from "@/Components/Quiz/Card";
import Layout from "@/Layouts/Layout";
import React from "react";

const Index = ({ auth, quizzes }) => {
    return (
        <Layout auth={auth.user} header="Quizzes" title="Quizzes">
            <Card quizzes={quizzes} show={false} />
        </Layout>
    );
};

export default Index;
