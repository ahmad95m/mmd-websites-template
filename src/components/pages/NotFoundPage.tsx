"use client";
;
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NotFoundPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-heading text-8xl text-primary mb-4">404</h1>
          <p className="text-2xl text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="cta" size="lg" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export { NotFoundPage };
