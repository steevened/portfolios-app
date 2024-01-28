import BioModal from "./bio.modal";

type InternalBio = {
  bio?: string;
  isMyProfile: true;
  type: "create" | "update";
};

type ExternalBio = {
  bio?: string;
  isMyProfile: false;
};

type Props = InternalBio | ExternalBio;

export default function BioSection(props: Props) {
  return (
    <div className="border p-2.5 rounded-lg grid gap-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-muted-foreground text-lg">Bio</h3>
        {props.isMyProfile ? (
          <BioModal bio={props.bio} type={props.type} />
        ) : null}
      </div>
      {!props.bio ? (
        <p className="text-sm">{"There's nothing here yet."}</p>
      ) : (
        <p className="text-sm">{props.bio}</p>
      )}
    </div>
  );
}
