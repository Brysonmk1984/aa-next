import Link from 'next/link';
import { useNationContext, useUserContext } from '@/contexts';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const isCurrentRoute = (page: string, pathname: string) => {
  if (pathname.includes(page.toLowerCase())) {
    return true;
  }
  return false;
};

export const Links = () => {
  const { user } = useUserContext();
  const { campaign } = useNationContext();

  const pathname = usePathname();

  return (
    <>
      <Link href="/how-to-play" className={classNames({ current_page: isCurrentRoute('how-to-play', pathname) })}>
        <div className="nav_link_content">
          <span>Guide</span>
        </div>
      </Link>
      <Link href="/warriors" className={classNames({ current_page: isCurrentRoute('warriors', pathname) })}>
        <div className="nav_link_content">
          <span>Warriors</span>
        </div>
      </Link>
      {user && (
        <Link
          href={(campaign?.highestLevelCompleted ?? 0) > 0 ? '/campaign/levels' : '/campaign'}
          className={classNames({ current_page: isCurrentRoute('campaign', pathname) })}
        >
          <div className="nav_link_content">
            <span>Campaign</span>
          </div>
        </Link>
      )}
      {user && (
        <Link href="/nation" className={classNames({ current_page: isCurrentRoute('nation', pathname) })}>
          <div className="nav_link_content">
            <span>Nation</span>
          </div>
        </Link>
      )}

      {user ? (
        <Link href="/auth/logout" className={classNames({ current_page: pathname === '/' })}>
          <div className="nav_link_content">
            <span>Logout</span>
          </div>
        </Link>
      ) : (
        <Link href="/auth/login" className={classNames({ current_page: pathname === '/' })}>
          <div className="nav_link_content">
            <span>Login</span>
          </div>
        </Link>
      )}
    </>
  );
};
