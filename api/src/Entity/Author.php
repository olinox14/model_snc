<?php
declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ApiResource(operations: [
    new Get()
])]
class Author
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100, nullable: false)]
    private string $name;

    #[ORM\OneToMany(targetEntity: Song::class, mappedBy: 'author', cascade: ['persist', 'remove'])]
    private Collection $songs;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getSongs(): Collection
    {
        return $this->songs;
    }

    public function addSong(Song $songs): self
    {
        if (!$this->songs->contains($songs)) {
            $this->songs[] = $songs;
            $songs->setAuthor($this);
        }

        return $this;
    }

    public function removeSong(Song $songs): self {
        $this->songs->removeElement($songs);
        return $this;
    }
}
