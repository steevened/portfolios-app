import ProjectDropDowd from '@/components/project-dropdown';
import TechnologiesGroup from '@/components/technologies-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getServerAuthSession } from '@/lib/auth';
import { getAllProjects } from '@/lib/services/projects.service';
import { getUserById } from '@/lib/services/user.service';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const projects = await getAllProjects({ searchParams });

  return (
    <div className="space-y-2.5">
      <div className="">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className="min-h-screen mx-auto max-w-screen-sm ">
        <ul className="space-y-5">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectItemCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ProjectItemCard = async ({
  project,
}: {
  project: Awaited<ReturnType<typeof getAllProjects>>[0];
}) => {
  const user = await getServerAuthSession();

  return (
    <div className="rounded-lg bg-card  space-y-2.5">
      <div className="p-2.5 space-y-2.5 ">
        <div className=" flex items-start justify-between">
          <UserCard userId={project.authorId} updatedAt={project.updatedAt} />
          {user?.user.id === project.authorId ? (
            <ProjectDropDowd projectId={project.id} />
          ) : null}
        </div>
        <div className="">
          <h5 className="font-medium">{project.name}</h5>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </div>
      {project.gallery.length > 0 ? (
        <div className="">
          <Image
            src={project.gallery[0].url}
            alt="project image"
            width={1000}
            height={1000}
          />
        </div>
      ) : null}
      <div className="px-2.5 space-y-5">
        <ul className="space-x-1">
          {project.liveUrl ? (
            <a
              rel="noopener noreferrer"
              className={buttonVariants({
                size: 'sm',
                className: '',
              })}
              href={project.liveUrl}
              target="_blank"
            >
              Live url
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              rel="noopener noreferrer"
              className={buttonVariants({
                size: 'sm',
                className: '',
              })}
              target="_blank"
              href={project.githubUrl}
            >
              GitHub url
            </a>
          ) : null}
        </ul>
        <div className=" pb-2.5 flex flex-wrap gap-1">
          {project.technologies.length > 0 ? (
            <>
              {project.technologies.map((t) => (
                <Badge
                  key={t.technology.id}
                  variant="secondary"
                  className="!bg-foreground/10 font-medium"
                >
                  {t.technology.name}
                </Badge>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const UserCard = async ({
  userId,
  updatedAt,
}: {
  userId: string;
  updatedAt: Date;
}) => {
  const user = await getUserById(userId);
  return (
    <div className="flex items-start gap-2">
      {user ? (
        <UserAvatar image={user?.image as string} name={user?.name as string} />
      ) : null}
      <div>
        <h5 className="text-sm font-medium leading-none">{user?.name}</h5>
        <small className="text-xs leading-none text-muted-foreground">
          {updatedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </small>
      </div>
    </div>
  );
};

const UserAvatar = async ({
  name,
  image,
}: {
  name: string;
  image?: string;
}) => {
  return (
    <Avatar className="w-12 h-12">
      {image ? <AvatarImage src={image} alt={name ?? ''} /> : null}
      <AvatarFallback className="uppercase">{name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};
