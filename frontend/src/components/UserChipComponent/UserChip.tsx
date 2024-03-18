import './UserChip.css';

export type UserChipProps = {
  profile_gradient: string;
  username: string;
  scale?: number;
};

export function UserChip({ profile_gradient, username, scale }: UserChipProps) {
  return (
    <div className="userChip" style={{ transform: `scale(${scale})` }}>
      <div className="userChipIcon" style={{ background: profile_gradient }} />
      <span className="usernameSpan">{username}</span>
    </div>
  );
}
