import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen, {
  LoadingScreenProps,
} from "components/templates/LoadingPage";
import { UrlObject } from "url";

interface RedirectProps extends LoadingScreenProps {
  /**
   * The URL to navigate to
   */
  to: UrlObject | string;
}

export default function Redirect({
  to,
  title = "Redirecting",
  subtitle,
}: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <LoadingScreen title={title} subtitle={subtitle} />;
}
