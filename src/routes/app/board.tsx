import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const Route = createFileRoute('/app/board')({
  component: Board,
});

function Board() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-xl ">Your boards</h1>
          <p className="text-xs font-semibold text-muted-foreground">
            5 boards
          </p>
        </div>
        <Button variant={'accent'}>
          <Plus />
          <span>New board</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <Card className="hover:shadow-lg pt-0">
          <CardHeader className="h-18 bg-violet-500" />
          <CardContent className=" space-y-2 ">
            <div className="font-semibold text-sm tracking-wide">
              Trello Roadmap
            </div>
            <div className="text-muted-foreground text-xs">8 lists</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
