export type UserChipProps = {
  profile_gradient: string;
  username: string;
};

export function UserChip({ profile_gradient, username }: UserChipProps) {
  return (
    <div className="userChip">
      <div className="userChipIcon" style={{ background: profile_gradient }} />
      {username}
    </div>
  );
}
