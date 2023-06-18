// @refresh disable

"use client";

import { projects } from "@/data/projects.jsonData.config.json";
import { tasks } from "@/data/tasks.jsonData.config.json";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import classes from "@/styles/projects/projects.module.css";
import ProjectTasks from "@/components/projects/details/ProjectTasks";
import ProjectDiscussion from "@/components/projects/details/ProjectDiscussion";
import ProjectFiles from "@/components/projects/details/ProjectFiles";
import TaskDetailsSidebar from "@/components/tasks/details/TaskDetailsSidebar";
import MainModal from "@/components/shared/MainModal";
import { AppContext } from "@/context/AppContext";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

const Project = ({ params }) => {
  const [isOpenBox, setisOpenBox] = useState(false);
  const [isTypeTask, setisTypeTask] = useState("kanban");
  const [taskDetailIsOpen, settaskDetailIsOpen] = useState(false);
  const [task, settask] = useState();
  const [typeOfProjectDetail, settypeOfProjectDetail] = useState("tasks");
  const { columns } = useContext(AppContext);

  const openTaskDetail = (id) => {
    const currentOpenedTask = tasks.find((task) => task.id === id);
    settask(currentOpenedTask);
    settaskDetailIsOpen(true);
  };
  const closeTaskDetail = () => settaskDetailIsOpen(false);

  const project = projects.find((p) => p.id === params.projectId);

  const deleteIcon = (
    <Image
      src="/images/graphic/x-mark.png"
      width={30}
      height={30}
      alt="delete"
    />
  );

  return (
    <Container maxWidth="xl" className={classes.main_project_details}>
      {taskDetailIsOpen && (
        <TaskDetailsSidebar task={task} onClose={closeTaskDetail} />
      )}
      <Box className={classes.main_topbar}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {project?.name}
          </Typography>
        </Box>
        <Box className={classes.main_actions}>
          <Button>
            <Image
              src="/images/graphic/bookmark.png"
              width={30}
              height={30}
              alt="lg"
            />
          </Button>
          <Button onClick={() => setisOpenBox((prevState) => !prevState)}>
            <Image
              src="/images/graphic/option.png"
              width={30}
              height={30}
              alt="lg"
            />
          </Button>
          {isOpenBox && (
            <Card className={classes.main_options}>
              <Button startIcon={deleteIcon} variant="outlined" color="error">
                Delete Project
              </Button>
            </Card>
          )}
        </Box>
      </Box>
      <Box className={classes.main_information}>
        <Box>
          <Button
            onClick={() => settypeOfProjectDetail("discussion")}
            variant={typeOfProjectDetail === "discussion" && "contained"}
          >
            Discussion
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("tasks")}
            variant={typeOfProjectDetail === "tasks" && "contained"}
          >
            Tasks
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("files")}
            variant={typeOfProjectDetail === "files" && "contained"}
          >
            Files
          </Button>
        </Box>
        <Box className={classes.main_tooltip}>
          {project?.teamMembers.map((mb) => (
            <Tooltip title={mb} placement="top" key={mb}>
              <IconButton size="large" className={classes.iconBtn}></IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
      {typeOfProjectDetail === "discussion" && <ProjectDiscussion />}
      {typeOfProjectDetail === "tasks" && (
        <ProjectTasks
          classes={classes}
          setisTypeTask={setisTypeTask}
          isTypeTask={isTypeTask}
          columns={columns}
          openDetailsHandler={openTaskDetail}
        />
      )}
      {typeOfProjectDetail === "files" && <ProjectFiles />}
    </Container>
  );
};

export default Project;
